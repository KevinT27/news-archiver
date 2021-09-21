function currentDate() {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  return dd + "." + mm + "." + yyyy;
}

export { currentDate };
