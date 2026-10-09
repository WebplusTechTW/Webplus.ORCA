import { describe, expect, it } from 'vitest'

import { buildZhTwCatalog, convertZhTwValue } from './generate-zh-tw-catalog.mjs'

describe('convertZhTwValue', () => {
  it('uses Taiwan phrasing from OpenCC', () => {
    expect(convertZhTwValue('默认软件设置')).toBe('預設軟體設定')
  })

  it('applies Taiwan term overrides OpenCC leaves behind', () => {
    expect(convertZhTwValue('克隆仓库')).toBe('複製儲存庫')
    expect(convertZhTwValue('终止会话')).toBe('終止工作階段')
  })

  it('keeps a specific phrase ahead of its general term', () => {
    expect(convertZhTwValue('电子邮件地址')).toBe('電子郵件地址')
    expect(convertZhTwValue('自定义地址')).toBe('自訂位址')
    expect(convertZhTwValue('您已退出')).toBe('您已登出')
  })

  it('picks the rendering from the English meaning', () => {
    expect(convertZhTwValue('GitHub 项目', 'GitHub item')).toBe('GitHub 項目')
    expect(convertZhTwValue('GitHub 项目', 'GitHub project')).toBe('GitHub 專案')
    expect(convertZhTwValue('取消固定标签', 'Unpin Tab')).toBe('取消固定分頁')
    expect(convertZhTwValue('标签', 'Labels')).toBe('標籤')
    expect(convertZhTwValue('检查已通过', 'Checks passed')).toBe('檢查已通過')
  })

  it('leaves interpolation placeholders untouched', () => {
    expect(convertZhTwValue('删除 {{value0}} 个文件')).toBe('刪除 {{value0}} 個檔案')
  })
})

describe('buildZhTwCatalog', () => {
  it('converts nested values and honours exact key overrides', () => {
    const source = { a: { b: '设置', c: '设置' } }
    const english = { a: { b: 'Settings', c: 'Settings' } }
    expect(buildZhTwCatalog(source, english, { 'a.c': '偏好設定' })).toEqual({
      a: { b: '設定', c: '偏好設定' }
    })
  })
})
