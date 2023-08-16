
const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return description;
  };


//custom logging functions that include additional information, such as timestamps or the source of the log
function logError(message, error) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);   }


  export default  {
    truncateDescription,
    logError
  }

