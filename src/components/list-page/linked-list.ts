import { MAX_LENGTH_RANDOM_STRARR, MIN_LENGTH_RANDOM_ARR } from "../../constants/element-captions";
import { TArrCircle } from "../../types/arr-circle";
import { randomArr, randomArrStr } from "../../utils/randomArr";

interface ILinkedList<T> {
  addHead: (value: T) => void;
  addTail: (value: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteAtIndex: (index: number) => void;
  addAtIndex: (value: T, index: number) => void;
  getSize: () => number;
  getArray: () => Node<T>[];
  getFirst: () => Node<T> | null;
  getLast: () => Node<T> | null;
  getAtIndex: (index: number) => Node<T> | null;
}

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(array: T[]) {
    this.head = null;
    this.size = 0;
    array.forEach((item) => this.addHead(item));
  }

  addHead(value: T) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  addTail(value: T) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }
    let cur = this.head;
    while (cur.next !== null) {
      cur = cur.next;
    }
    cur.next = newNode;
    this.size++;
  }

  deleteHead() {
    if (this.head === null) {
      return;
    }
    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
      return;
    }
    let cur = this.head;
    while (cur.next != null && cur.next.next != null) {
      cur = cur.next;
    }
    cur.next = null;
    this.size--;
  }

  addAtIndex(value: T, index: number) {
    const newNode = new Node(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let cur = this.head;
    for (let i = 0; i < index - 1 && cur !== null; ++i) {
      cur = cur.next;
    }
    if (cur === null) {
      return;
    }
    newNode.next = cur.next;
    cur.next = newNode;
    this.size++;
  }

  deleteAtIndex(index: number) {
    if (this.head === null) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let cur = this.head;
    for (let i = 0; i < index - 1 && cur !== null; ++i) {
      if (cur.next) cur = cur.next;
    }
    if (cur === null || cur.next === null) {
      return;
    }
    cur.next = cur.next.next;
    this.size--;
  }

  getArray() {
    const array = [];
    let cur = this.head;
    while (cur) {
      array.push(cur);
      cur = cur.next;
    }
    return array;
  }

  getSize(): number {
    return this.size;
  }

  getAtIndex(index: number) {
    let current: Node<T> | null = this.head;
    let i = 0;
    while (current !== null && i < index) {
      current = current.next;
      i++;
    }
    return current !== null && i === index ? current as any : null;
  }

  getFirst() {
    if (this.head === null) {
      return null;
    }
    return this.head;
  }

  getLast() {
    if (this.head === null) {
      return null;
    }
    let lastNode = this.head;
    while (lastNode.next !== null) {
      lastNode = lastNode.next;
    }
    return lastNode;
  }
}

export const linkedList = new LinkedList<TArrCircle>(randomArrStr(MIN_LENGTH_RANDOM_ARR, MAX_LENGTH_RANDOM_STRARR));
