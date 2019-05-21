const composeSequential = (procedures) => (
  () => (
    procedures.forEach(fn => (
      fn()
    ))
  )
);
export default composeSequential;
