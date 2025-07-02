export const logger = (msg) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(msg);
  }
}; 