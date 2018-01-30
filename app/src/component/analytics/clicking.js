import { actionHub } from '../../loader'

const defaultSelectors = ['a', 'button', 'input', 'textarea', 'option', 'video', 'audio', 'embed', 'object']

export default function setupClickingAnalytics (store, extraSelectors, ignoreDefaults) {
  var selectorArray = []

  if (extraSelectors !== undefined) {
    if (typeof extraSelectors === 'string') {
      selectorArray = extraSelectors.split(' ').filter(i => i !== '')
    } else if (extraSelectors instanceof Array) {
      selectorArray = extraSelectors
    }
  }

  if (!ignoreDefaults) {
    selectorArray = selectorArray.concat(defaultSelectors)
  }

  var selectors = new Selectors(selectorArray)

  window.onclick = function (event) {
    for (var element of event.path) {
      if (selectors.match(element)) {
        store.dispatch(actionHub.ANALYTICS_CLICKED(getElementData(element)))
        console.log(getElementData(element))
        return true
      }
    }
    console.log(event)
    return true
  }
}

class Selectors {

  constructor (selectorArray) {
    this.tags = []
    this.cssClasses = []
    for (var selector of selectorArray) {
      if (selector.startsWith('.')) {
        this.cssClasses.push(selector.substr(1))
      } else {
        this.tags.push(selector.toLowerCase())
      }
    }
  }

  match (element) {
    var tagName = element.tagName
    if (!tagName) {
      // an element without tag name is probably the document element
      if (element === document) return false
    } else if (this.tags.includes(tagName.toLowerCase())) {
      return true
    }

    for (var cssClass of this.cssClasses) {
      if (element.classList.contains(cssClass)) {
        return true
      }
    }

    return false
  }

}

function getElementData (element) {
  if (element.href) return { href: element.href }
  if (element.id !== '') return { id: element.id }
  // if (element.classList.value !== '') return element.classList.value
  return { element: getTagHtml(element) }
}

function getTagHtml (element) {
  var htmlText = element.outerHTML
  var tagHtml = htmlText.substr(htmlText.search(/</), htmlText.search(/>/) + 1)

  const partstoIgnore = ['style']
  for (var attr of partstoIgnore) {
    tagHtml = tagHtml.replace(
      new RegExp(attr + '\\s*=\\s*["\'][^"\']*["\']', 'i'),
      ''
    )
  }

  return tagHtml
}

