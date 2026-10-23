import { expect, test } from '@playwright/test'

for (const width of [320, 390, 810, 1280, 1440]) {
  test(`layout and local assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const failed: string[] = []
    page.on('pageerror', error => failed.push(error.message))
    await page.goto('./')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.masonry')).toHaveAttribute('data-ready', 'true')
    await expect(page.locator('.project-card')).toHaveCount(8)
    await expect(page.locator('.social-card')).toHaveCount(3)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const images = page.locator('img')
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
    if (width >= 810) {
      const cards = await page.locator('.social-card').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height))
      expect(Math.max(...cards) - Math.min(...cards)).toBeLessThan(1)
      const projects = await page.locator('.project-card').evaluateAll(elements => elements.map(el => ({ x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y,bottom:el.getBoundingClientRect().bottom })))
      for (let i = 2; i < projects.length; i++) expect(projects[i].y - projects[i-2].bottom).toBeGreaterThanOrEqual(19)
    }
    expect(failed).toEqual([])
  })
}

test('Power Apps keyboard, focus restoration, close button and backdrop', async ({ page }) => {
  await page.goto('./')
  const trigger = page.getByRole('button', { name: 'Explore three Power Apps projects' })
  await trigger.focus()
  await trigger.press('Enter')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.modal-case')).toHaveCount(3)
  await expect(page.getByRole('button', { name: 'Close modal' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Close modal' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.getByRole('button', { name: 'Close modal' }).click()
  await expect(dialog).toHaveCount(0)
  await trigger.press('Space')
  await expect(dialog).toBeVisible()
  await page.mouse.click(2, 2)
  await expect(dialog).toHaveCount(0)
})

test('keeps every original project and profile destination', async ({ page }) => {
  await page.goto('./')
  for (const href of ['https://www.dnb.no/kort/barn', 'https://helsedata.no/', 'https://www.maxbyggservice.no/', 'https://borisk.photos/', 'https://battleshipboards.com/', 'https://www.capgemini.com/news/client-stories/nortura-modernizes-health-and-safety-reporting/', 'https://www.linkedin.com/in/boriskrstic/', 'https://www.flickr.com/photos/krkojzla/', 'https://www.pexels.com/@borisk/', 'mailto:borisimple@gmail.com']) {
    expect(await page.locator(`a[href="${href}"]`).count()).toBeGreaterThan(0)
  }
})
