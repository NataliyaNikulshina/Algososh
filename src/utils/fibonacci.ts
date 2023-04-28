export const getFibonacci = (num: number) =>{
    let arrFib: number[] = [1, 1]; 
    for (let i = 2; i <= num; i++) {
        arrFib[i] = arrFib[i - 2] + arrFib[i - 1];
    }
  return arrFib;
}
