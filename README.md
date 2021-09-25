# react-flux-context

A global store is created by context hook with **flux pattern** for react apps.

**`bundle size:`** <br/>
- **`unpackage size:     4.4KB`** <br/>
- **`gzip size: 1.6KB`** <br/>

You can structure your store by reducers, actions, types like a redux pattern, but it has a easier setup to use it and very small size.

`(Do not use it in ssr, its not ready yet)!`

And it has a redux-thunk and redux-persist usage too with very simple config.

<br/>
<br/>

> ## **List**

- [react-flux-context](#react-flux-context)
- [Installation](#installation)
- [store folder structure](#store-folder-structure)
  - [`types`](#types)
  - [`reducers`](#reducers)
  - [`actions`](#actions)
  - [`create collection`](#create-collection)
  - [`Project Example`](https://github.com/mohammadbrzbrz72/react-flux-context/tree/master/example)
- [useSelector](#useselector)
- [useDispatch](#usedispatch)
- [useMultiDispatch](#usemultidispatch)
- [useFluxContext](#usefluxcontext)
- [useFluxMultiContext](#usefluxmulticontext)
- [useRefStore](#userefstore)
- [Storage](#storage)
- [License](#license)

<br/>
<br/>

## Installation

#

with npm:

`npm install --save react-flux-context`

with yarn:

`yarn add react-flux-context`

[go to List](#list)

<br/>
<br/>

## store folder structure

#

First, create a store folder in your src folder in your project directory and then create three folder with the names `actions`, `reducers` and `types` in store folder.

<br/>
<br/>

### `types`:

It shows user's action type and ux(user experience like loading for api request, ... ) in actions.

In your types folder, you create a file according to your requirements

<br/>

```jsx
export const REGISTER_REQUEST = "REGISTER_REQUEST";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const REGISTER_FAILURE = "REGISTER_FAILURE";
```

[go to List](#list)

<br/>
<br/>

### `reducers`

In reducers files, set your initial state and reducer which is relevant to your action types

<br/>

```jsx
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../types/authTypes";

export const authState = {
  role: null,
  token: null,
  isLogin: false,
  loading: false,
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...payload,
        isLogin: true,
        loading: false,
      };

    case REGISTER_FAILURE:
      return {
        ...payload,
        loading: false,
      };

    default:
      throw new Error("there is no type for authReducers");
  }
};
```

[go to List](#list)

<br/>
<br/>

### `actions`

Action is to handle users actions.

Pattern in react-flux-context is a little different. <br />
when you want to create actions in redux, **`type`** keyname must be exist, but in this package you have to set **key** keyname too.

The reason is in the **react-flux-context** that we use `selector pattern` for better perfomance instead of using `combination pattern` for reducers! <br />
It means for example, when you put **reducer** in user keyword in your store collection, you have to set **key** in your dispatch where you set your reducer in collection like auth, user or , ... etc. <br />
Then you have to set dispatch argument in your actions as topest and first argument in your function.

If you want to give data to your reducers, set a payload as keyword. (like a fetching data from api and saving in store)

`(This action pattern works like a redux-thunk)`

```jsx
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../types/authTypes";
import { loginApi } from "../../services";

// Login actions
const authRequsetAction = (dispatch) => {
  dispatch({ key: "auth", type: REGISTER_REQUEST });
};

const authSuccessAction = (dispatch, payload) => {
  dispatch({ key: "auth", type: REGISTER_SUCCESS, payload });
};

const authFailureAction = (dispatch) => {
  dispatch({ key: "auth", type: REGISTER_FAILURE });
};

export const authLoginAction = (dispatch) => {
  authRequsetAction(dispatch);

  loginApi()
    .then((res) => {
      authSuccessAction(dispatch, res);
    })
    .catch((err) => {
      authFailureAction(dispatch);
    });
};
```

[go to List](#list)

<br/>
<br/>

### `create collection`

To initialize your store, you must create a store collection and put it in FluxContextProvider store as a prop.

If you want to `persist` your data, set a **storage** type and **storageKey**

> **storage**: <br />
> local (localStorage) <br />
> session (sessionStorage)
>
> **storageKey**: <br />
> "some text"

```jsx
import { FluxContextProvider } from "react-flux-context";

import { authState, authReducer } from "./reducers/authReducer";
import { userState, usersReducer } from "./reducers/usersReducer";

const storeCollection = {
  user: {
    state: userState,
    reducer: usersReducer,
  },
  auth: {
    // persist your data in storage automatically
    // it works like a redux-persist but has a very easier config
    state: authState,
    reducer: authReducer,
    storage: "local", // local | session
    storageKey: "_myAuthKey_",
  },
};

export default function ContextProvider({ children }) {
  return (
    <FluxContextProvider store={storeCollection}>
      {children}
    </FluxContextProvider>
  );
}
```

[go to List](#list)

<br/>
<br/>

## useSelector

#

Select your state with callback function or set nulish data to get states.

```jsx
import { useSelector } from "react-flux-context";

function Component() {
  const userData = useSelector((data) => data.user);
  // or
  const { user } = useSelector();

  return (
    <div>
      <p> user fullname: {userData.fullname} </p>
      <p> user fullname: {user.fullname} </p>
    </div>
  );
}
```

[go to List](#list)

<br/>
<br/>

## useDispatch

#

useDispatch get actions in param and then dispather is ready to be used.

```jsx
import { useDispatch } from "react-flux-context";
import { userAction } from "../store/actions/userAction";

function Component() {
  const userDispath = useDispatch(userAction);

  useEffect(() => {
    userDispath();
  }, []);

  return (
    <div>
      // or you can use with click event
      <button onClick={() => userDispath()}>get user</button>
    </div>
  );
}
```

[go to List](#list)

<br/>
<br/>

## useMultiDispatch

#

You can use multiple actions with useMultiDispatch

```jsx
import { useMultiDispatch } from "react-flux-context";
import { userAction } from "../store/actions/userAction";
import { logoutAction } from "../store/actions/authAction";

function Component() {
  const [userDispath, logoutAction] = useMultiDispatch([
    userAction,
    logoutAction,
  ]);

  useEffect(() => {
    userDispath();
  }, []);

  return (
    <div>
      // or you can use with onClick and other event!
      <button onClick={() => logoutAction()}>get user</button>
    </div>
  );
}
```

[go to List](#list)

<br/>
<br/>

## useFluxContext

#

First argument is like a useSelector. <br/>
Second argument is like a useDispatch .

```jsx
import { useMultiDispatch } from "react-flux-context";
import { userAction } from "../store/actions/userAction";

function Component() {
  const [userData, userDispatch] = useFluxMultiContext(
    (data) => data.user,
    userAction
  );

  return <> ... </>;
}
```

[go to List](#list)

<br/>
<br/>

## useFluxMultiContext

#

First argument is like a useSelector.
Second argument is like a useMultiDispatch .

```jsx
import { useMultiDispatch } from "react-flux-context";
import { logoutAction } from "../store/actions/authAction";
import { userAction } from "../store/actions/userAction";

function Component() {
  const [{ user, auth }, [logoutDispatch, userDispatch]] = useFluxMultiContext(
    null,
    [logoutAction, userAction]
  );

  return <> ... </>;
}
```

[go to List](#list)

<br/>
<br/>

## useRefStore

#

You can use it for binary stream data in webrtc project or styling for motions, ... .

> `useRefStore(initialRefStore, isFunction = false)`

<br />

You can store a function in useRefStore to use it anywhere

> `useRefStore(() => console.log('hi'), true)`

<br />
And you can specify isFunction as a second parameter again when you invoked setRef.
<br />
<br />

```jsx
import { useRef } from "react";
import { useRefStore } from "react-flux-context";

function Component() {
  const elmRef = useRef();
  const [myRef, setMyRef] = useRefStore(0);

  const moveForward = () => {
    setMyRef(myRef.current + 10);
    ref.current.style.top = myRef.current;
  };

  return (
    <div>
      <button onClick={moveForward}>move to forward</button>

      <div ref={elmRef}>translate this element</div>
    </div>
  );
}
```

[go to List](#list)

<br/>
<br/>

## Storage

#

Get or set data from localStorage or sessionStorage with Storage by buttom keywords:

- getLocal
- setLocal
- getSession
- setSession

```jsx
import { Storage } from 'react-flux-context';

fuction api() {
  const prePath = Storage.getLocal('__auth__');
  console.log(prePath.role)

  Storage.setLocal('__user__', {
    first_name: 'jack',
    second_name: 'jaki',
    age: 12
  }})

}
```

[go to List](#list)

<br/>
<br/>

## License

MIT © [mohammadbrzbrz72](https://github.com/mohammadbrzbrz72)
