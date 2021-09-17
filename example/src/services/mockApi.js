export const loginApi = function (timeout = 1500, hasLogin = true) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (hasLogin) {
        resolve({
          role: 'admin',
          token: '35sdfdf543sdff35asdlkhb@!#$#~kjbdfdjzlkjbaslkjb'
        })
      } else {
        reject({ message: 'Password or Email is not correct' })
      }
    }, timeout)
  })
}

export const userApi = function (
  timeout = 1500,
  hasData = true,
  data = [
    {
      id: '5d1asdd',
      fullname: 'ali alavi',
      age: 12,
      email: 'eeeeee@mail.com',
      isMarried: false
    },
    {
      id: 'nasdd3a1xc',
      fullname: 'jack nick',
      age: 35,
      email: 'aaaaaa@mail.com',
      isMarried: true
    }
  ]
) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (hasData) {
        resolve({ data })
      } else {
        reject({ message: 'No access' })
      }
    }, timeout)
  })
}
