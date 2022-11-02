import fileJson from "./jsonFile.json" assert { type: "json" };

// --------------Test 1
const numArr = [0, 10, 1, 99, 9, 8, 79, 91, 22, 32, 12];

function test1(arr) {
  const maxCombine = (arr) =>
    +arr.sort((x, y) => +("" + y + x) - +("" + x + y)).join("");
  // test & output

  return maxCombine(arr);
}

console.log(test1(numArr));

// ---------------Test 2

function test2(fileJson) {
  function randomFromArr(num, arr, cb) {
    let cloneArr = [...arr];
    const resArr = [];
    let resArrLength = resArr.length;
    let arrLength = cloneArr.length;

    do {
      const randomPos = Math.floor(Math.random() * arrLength);
      const arrValue = cb(cloneArr, randomPos, resArrLength);

      resArr.push(arrValue);
      cloneArr.splice(randomPos, 1);

      resArrLength++;
      arrLength--;

      if (resArrLength < num && arrLength === 0) {
        cloneArr = [...arr];
        arrLength = cloneArr.length;
      }
    } while (arrLength > 0 && resArrLength < num);

    return resArr;
  }

  function randomGroup(itemsPerGroup, groupAmount, arr) {
    const cloneArr = [...arr];
    let arrLength = cloneArr.length;

    if (itemsPerGroup * groupAmount !== arrLength)
      return alert(
        "Can not group because itemsPerGroup or groupAmount not suitable"
      );

    let resArr = [];
    let resArrLength = resArr.length;
    const randomArr = randomFromArr(
      arrLength,
      cloneArr,
      (cloneArr, randomPos) => cloneArr[randomPos]
    );

    let i = 1;

    do {
      const arrValue = randomArr[0];
      if (i === 1) {
        resArr.push({
          values: [arrValue],
          primaryIndex: arrValue.index,
        });
      } else {
        resArr[resArrLength].values.push(arrValue);
      }

      randomArr.splice(0, 1);
      arrLength--;
      if (i < itemsPerGroup) i++;
      else {
        i = 1;
        resArrLength++;
      }
    } while (arrLength > 0);

    return resArr;
  }

  const get24ItemsFromJson = randomFromArr(
    24,
    fileJson,
    (cloneArr, randomPos, resArrLength) => ({
      name: cloneArr[randomPos],
      index: resArrLength,
    })
  );
  const get18ItemsFromJson = randomFromArr(
    18,
    get24ItemsFromJson,
    (cloneArr, randomPos) => cloneArr[randomPos]
  );

  const get6GroupFromJson = randomGroup(3, 6, get18ItemsFromJson);

  return get6GroupFromJson;
}

console.log(test2(fileJson));
