const handleEvent = (event, cl, props) => {
    event.stopPropagation();
    cl(...props);
  }

export { handleEvent };