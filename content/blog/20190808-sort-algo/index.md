---
title: 排序相关算法
date: "2019-08-07T16:00:00.000Z"
description: ""
---

## 选择排序

首先，找到数组中最小的那个元素，其次，将它和数组的第一个元素交换位置。再次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置。

特点：

- 运行时间和输入无关
- 数据移动是最少的

```javascript
function sort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i; j < len; j++) {
      if (less(arr, j, min)) min = j;
    }
    exch(arr, i, min);
  }
}
```

## 插入排序

循环数组，保证当前索引左边的所有元素都是有序的，比较当前索引和前面有序元素，将此索引插入至合适的位置。

特点为：对部分有序的数组排序速度较快

```javascript
function sort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && less(arr, j, j - 1); j--) {
      exch(arr, j, j - 1);
    }
  }
}
```

## 归并排序

递归地将数组分成两半分别排序，然后再将结果归并起来。

有点是保证将任意长度为 N 的数组排序所需时间和 NlogN 成正比；缺点是所需的额外空间和 N 成正比。

```javascript
// 辅助数组
let aux;

function merge(arr, lo, mid, hi) {
  // copy
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }

  let i = lo,
    j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      // 左半边用尽
      arr[k] = aux[j++];
    } else if (j > hi) {
      // 右半边用尽
      arr[k] = aux[i++];
    } else if (less(aux, i, j)) {
      // 左边小
      arr[k] = aux[i++];
    } else {
      // 右边小
      arr[k] = aux[j++];
    }
  }
}

function _sort(arr, lo, hi) {
  if (lo >= hi) return;
  if (lo + 1 === hi) {
    if (less(arr, hi, lo)) exch(arr, hi, lo);
    return;
  }

  const mid = lo + Math.floor((hi - lo) / 2);
  _sort(arr, lo, mid);
  _sort(arr, mid + 1, hi);
  merge(arr, lo, mid, hi);
}

function sort(arr) {
  const len = arr.length;

  // 初始化辅助数组
  aux = new Array(len);

  _sort(arr, 0, len - 1);
}
```

## 快速排序

通过切分将数组分成两个子数组，切分后左半边数组不大于切分点，右半边数组不小于切分点，然后再递归地排序。

特点：

- 原地排序
- 长度为 N 的数组排序所需的时间和 NlogN 成正比
- 在切分不平衡时是低效的，所以一开始可打乱数组

```javascript
// 打乱数组
function random(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    exch(arr, i, Math.floor(Math.random() * len));
  }
}

// 切分
function partition(arr, lo, hi) {
  let i = lo,
    j = hi + 1;
  while (true) {
    while (less(arr, ++i, lo)) {
      if (i === hi) break;
    }
    while (less(arr, lo, --j)) {
      if (j === lo) break;
    }
    if (i >= j) break;
    exch(arr, i, j);
  }
  exch(arr, lo, j);
  return j;
}

function _sort(arr, lo, hi) {
  if (lo >= hi) return;
  if (lo + 1 === hi) {
    if (less(arr, hi, lo)) exch(arr, hi, lo);
    return;
  }

  // 切点
  const p = partition(arr, lo, hi);
  _sort(arr, lo, p - 1);
  _sort(arr, p + 1, hi);
}

function sort(arr) {
  random(arr);
  const len = arr.length;
  _sort(arr, 0, len - 1);
}
```

## 堆排序

```javascript
// 堆下沉
function sink(arr, i, len) {
  while (i * 2 + 1 < len) {
    // 下沉时和两个子节点中较大的一个交换
    let j = i * 2 + 1;
    if (j + 1 <= len - 1 && less(arr, j, j + 1)) j = j + 1;

    if (less(arr, i, j)) {
      exch(arr, i, j);
      i = j;
    } else {
      break;
    }
  }
}

function sort(arr) {
  const len = arr.length;

  // 堆有序
  for (let k = Math.floor(len / 2); k >= 0; k--) {
    sink(arr, k, len);
  }

  // 挑选最大值
  let n = len;
  while (n > 1) {
    // 交换第一个和最后一个元素，此时最后一个元素肯定就是最大值了
    exch(arr, 0, --n);
    // 堆长度减一后下沉
    sink(arr, 0, n);
  }
}
```