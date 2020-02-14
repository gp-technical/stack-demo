class db {
  static sequence = ''
  static last = 1

  static fibo(n) {
    if (n < 2) {
      return 1;
    } else {
      return this.fibo(n - 2) + this.fibo(n - 1);
    }
  }

  static next() {
    if (this.last < 2) {
      this.sequence = '1';
    } else {
      const result = this.fibo(this.last - 2) + this.fibo(this.last - 1)
      this.sequence += ` ${result}`;
    }
    this.last++
  }

  static bigNumber() {
    this.last = 1
    while (this.last < 41) {
      this.next()
    }
  }
  
  static getSequence() {
    return this.sequence
  }
}

export default db
