import { test, expect } from '@playwright/test';

test.describe('Deterministic suite: 24 pass + 10 fail', () => {
  test.describe('PASS (24)', () => {
    test('PASS_01 - basic math', async () => {
      expect(2 + 2).toBe(4);
    });

    test('PASS_02 - string contains', async () => {
      expect('playwright').toContain('wright');
    });

    test('PASS_03 - array length', async () => {
      expect([1, 2, 3]).toHaveLength(3);
    });

    test('PASS_04 - object property', async () => {
      expect({ a: 1, b: 2 }).toHaveProperty('b', 2);
    });

    test('PASS_05 - truthy', async () => {
      expect('non-empty').toBeTruthy();
    });

    test('PASS_06 - page setContent + text', async ({ page }) => {
      await page.setContent('<h1>Hello</h1>');
      await expect(page.locator('h1')).toHaveText('Hello');
    });

    test('PASS_07 - page title via setContent', async ({ page }) => {
      await page.setContent('<title>My Title</title><div>ok</div>');
      await expect(page).toHaveTitle('My Title');
    });

    test('PASS_08 - locator count', async ({ page }) => {
      await page.setContent('<ul><li>a</li><li>b</li><li>c</li></ul>');
      await expect(page.locator('li')).toHaveCount(3);
    });

    test('PASS_09 - attribute check', async ({ page }) => {
      await page.setContent('<a id="x" href="/home">home</a>');
      await expect(page.locator('#x')).toHaveAttribute('href', '/home');
    });

    test('PASS_10 - visibility', async ({ page }) => {
      await page.setContent('<button>Click</button>');
      await expect(page.getByRole('button', { name: 'Click' })).toBeVisible();
    });

    test('PASS_11 - input fill', async ({ page }) => {
      await page.setContent('<input id="name" />');
      await page.locator('#name').fill('abc');
      await expect(page.locator('#name')).toHaveValue('abc');
    });

    test('PASS_12 - checkbox check', async ({ page }) => {
      await page.setContent('<label><input type="checkbox" id="c" /> c</label>');
      await page.locator('#c').check();
      await expect(page.locator('#c')).toBeChecked();
    });

    test('PASS_13 - select option', async ({ page }) => {
      await page.setContent(`
        <select id="s">
          <option value="a">A</option>
          <option value="b">B</option>
        </select>
      `);
      await page.locator('#s').selectOption('b');
      await expect(page.locator('#s')).toHaveValue('b');
    });

    test('PASS_14 - regex match', async () => {
      expect('IT23222236').toMatch(/^IT\d+$/);
    });

    test('PASS_15 - toBeGreaterThan', async () => {
      expect(10).toBeGreaterThan(3);
    });

    test('PASS_16 - toBeCloseTo', async () => {
      expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
    });

    test('PASS_17 - page content contains', async ({ page }) => {
      await page.setContent('<div data-test="x">content</div>');
      await expect(page.locator('[data-test="x"]')).toContainText('cont');
    });

    test('PASS_18 - nth locator', async ({ page }) => {
      await page.setContent('<p>one</p><p>two</p><p>three</p>');
      await expect(page.locator('p').nth(1)).toHaveText('two');
    });

    test('PASS_19 - evaluate returns value', async ({ page }) => {
      await page.setContent('<div id="n">5</div>');
      const value = await page.evaluate(() => Number(document.querySelector('#n')?.textContent));
      expect(value).toBe(5);
    });

    test('PASS_20 - keyboard type', async ({ page }) => {
      await page.setContent('<input id="t" />');
      await page.locator('#t').focus();
      await page.keyboard.type('xyz');
      await expect(page.locator('#t')).toHaveValue('xyz');
    });

    test('PASS_21 - multiple assertions', async ({ page }) => {
      await page.setContent('<h2>Header</h2><div class="box">Box</div>');
      await expect(page.locator('h2')).toHaveText('Header');
      await expect(page.locator('.box')).toHaveText('Box');
    });

    test('PASS_22 - promise resolves', async () => {
      await expect(Promise.resolve('ok')).resolves.toBe('ok');
    });

    test('PASS_23 - promise rejects', async () => {
      await expect(Promise.reject(new Error('boom'))).rejects.toThrow('boom');
    });

    test('PASS_24 - date object', async () => {
      const d = new Date('2026-01-31T00:00:00.000Z');
      expect(d.getUTCFullYear()).toBe(2026);
    });
  });

  test.describe('FAIL (10)', () => {
    test('FAIL_01 - wrong math', async () => {
      expect(2 + 2).toBe(5);
    });

    test('FAIL_02 - wrong string expectation', async () => {
      expect('playwright').toContain('selenium');
    });

    test('FAIL_03 - wrong array length', async () => {
      expect([1, 2, 3]).toHaveLength(4);
    });

    test('FAIL_04 - wrong property value', async () => {
      expect({ a: 1 }).toHaveProperty('a', 2);
    });

    test('FAIL_05 - expected truthy but false', async () => {
      expect('').toBeTruthy();
    });

    test('FAIL_06 - wrong page text', async ({ page }) => {
      await page.setContent('<h1>Hello</h1>');
      await expect(page.locator('h1')).toHaveText('World');
    });

    test('FAIL_07 - wrong title', async ({ page }) => {
      await page.setContent('<title>My Title</title><div>ok</div>');
      await expect(page).toHaveTitle('Other Title');
    });

    test('FAIL_08 - wrong locator count', async ({ page }) => {
      await page.setContent('<ul><li>a</li><li>b</li><li>c</li></ul>');
      await expect(page.locator('li')).toHaveCount(2);
    });

    test('FAIL_09 - wrong checkbox state', async ({ page }) => {
      await page.setContent('<label><input type="checkbox" id="c" /> c</label>');
      // Not checking it on purpose
      await expect(page.locator('#c')).toBeChecked();
    });

    test('FAIL_10 - rejected promise expected to resolve', async () => {
      await expect(Promise.reject(new Error('nope'))).resolves.toBe('ok');
    });
  });
});

