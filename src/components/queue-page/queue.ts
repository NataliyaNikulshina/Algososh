import { TArrCircle } from "../../types/arr-circle";
import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    clear: () => void;
    isEmpty: () => void;
    getSize: () => number;
    getContainer: () => T[];
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head = 0;
    private tail = 0;
    private item = { el: "", color: ElementStates.Default };
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size).fill(this.item);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }
      if (this.tail === this.size) this.tail = 0; 
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      if (this.head === this.size) this.head = 0;
      this.container[this.head % this.size] = this.item as any;
      this.head++;
      this.length--;
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      return this.container[this.head % this.size] || null;
    };
  
    isEmpty = () => this.length === 0;

    clear = () => {
        this.container = Array(this.size).fill(this.item);
        this.length = 0;
        this.head = 0;
        this.tail = 0;
       
      };

    getSize = () => this.length;

    getContainer = () => this.container;

    getHead = () => this.head;

    getTail = () => this.tail;
  }

  export const queue = new Queue<TArrCircle>(7);