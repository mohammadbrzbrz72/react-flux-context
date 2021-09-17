export const isItDefenitlyAFunction = data => {
  if (data instanceof Function) {
    return true;
  }
  throw new Error(`useDispatch argument should be callback`);
};

export const isItDefenitlyAFunctionOrNulish = data => {
  if (
    data instanceof Function ||
    data === undefined ||
    data === null
  ) {
    return true;
  }
  throw new Error(
    `useSelector argument should be callback or nulish(undefined or null)`,
  );
};

export const isItDefenitlyArrayOfFunction = data => {
  const showError = () => {
    throw new Error(
      `useDispatch callback should be function or Array of function`,
    );
  };

  if (Array.isArray(data)) {
    const areAllTheyIsFunction = data.every(
      func => func instanceof Function,
    );
    if (areAllTheyIsFunction) return true;

    showError();
  }

  showError();
};
