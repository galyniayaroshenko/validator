// Get high resolution time (in milliseconds).
module.exports = function () {
  // ts = [seconds, nanoseconds]
  var ts = process.hrtime();
  // Convert seconds to milliseconds and nanoseconds to
  // milliseconds as well.
  return (ts[0] * 1000) + (ts[1] / 1000000);
};