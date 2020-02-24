class db {
  static sequence = {}
  static last = {}

  static fibo(n) {
    if (n < 2) {
      return 1;
    } else {
      return this.fibo(n - 2) + this.fibo(n - 1);
    }
  }

  static next(sid) {
    if(!this.last[sid]){
      this.last[sid] = 1
    }
    if (this.last[sid] < 2) {
      this.sequence[sid] = '1';
    } else {
      const result = this.fibo(this.last[sid] - 2) + this.fibo(this.last[sid] - 1)
      this.sequence[sid] += ` ${result}`;
    }
    this.last[sid]++
  }

  static bigNumber(sid) {
    this.last[sid] = 1
    while (this.last[sid] < 41) {
      this.next(sid)
    }
  }
  
  static getSequence(sid) {
    return this.sequence[sid]
  }
}

export default db
