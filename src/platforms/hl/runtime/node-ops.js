/* @flow */
declare var document: HLDocument;

import TextNode from 'hl/runtime/text-node'

export const namespaceMap = {}

export function createElement(tagName: string): HLElement {
  return document.createElement(tagName)
}

export function createElementNS(namespace: string, tagName: string): HLElement {
  return document.createElement(namespace + ':' + tagName)
}

export function createTextNode(text: string) {
  return new TextNode(text)
}

export function createComment(text: string) {
  return document.createComment(text)
}

export function insertBefore(
  node: HLElement,
  target: HLElement,
  before: HLElement
) {
  if (target.nodeType === 3) {
    if (node.type === 'text') {
      node.setAttr('value', target.text)
      target.parentNode = node
    } else {
      const text = createElement('text')
      text.setAttr('value', target.text)
      node.insertBefore(text, before)
    }
    return
  }
  node.insertBefore(target, before)
}

export function removeChild(node: HLElement, child: HLElement) {
  if (child.nodeType === 3) {
    node.setAttr('value', '')
    return
  }
  node.removeChild(child)
}

export function appendChild(node: HLElement, child: HLElement) {
  if (child.nodeType === 3) {
    if (node.type === 'text') {
      node.setAttr('value', child.text)
      child.parentNode = node
    } else {
      const text = createElement('text')
      text.setAttr('value', child.text)
      node.appendChild(text)
    }
    return
  }

  node.appendChild(child)
}

export function parentNode(node: HLElement): HLElement | void {
  return node.parentNode
}

export function nextSibling(node: HLElement): HLElement | void {
  return node.nextSibling
}

export function tagName(node: HLElement): string {
  return node.type
}

export function setTextContent(node: HLElement, text: string) {
  if (node.parentNode) {
    node.parentNode.setAttr('value', text)
  }
}

export function setAttribute(node: HLElement, key: string, val: any) {
  node.setAttr(key, val)
}

export function setStyleScope(node: HLElement, scopeId: string) {
  node.setAttr('@styleScope', scopeId)
}
