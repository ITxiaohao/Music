// 增加类样式
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

//
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 封装获取 index 的值，在 listview.vue 中有用
export function getData(el, name, val) {
  // 获取 data- 属性的
  const prefix = 'data-'
  name = prefix + name
  // 如果有值就 set 没有就 get
  if (val) {
    // setAttribute 设置属性
    return el.setAttribute(name, val)
  } else {
    // getAttribute 获取属性，在这里是 获取 data- + name 这样拼接出来的属性，如 data-index
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
