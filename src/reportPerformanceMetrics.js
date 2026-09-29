const reportPerformanceMetrics = (onMetric) => {
  if (typeof onMetric !== 'function' || !window.performance) return;

  const reportMetrics = () => {
    const navigation = window.performance.getEntriesByType('navigation')[0];
    const paintEntries = window.performance.getEntriesByType('paint');

    if (navigation) {
      onMetric({
        name: 'time-to-first-byte',
        value: navigation.responseStart - navigation.requestStart,
      });
      onMetric({
        name: 'page-load',
        value: navigation.loadEventEnd - navigation.startTime,
      });
    }

    paintEntries.forEach((entry) => {
      onMetric({ name: entry.name, value: entry.startTime });
    });
  };

  if (document.readyState === 'complete') {
    reportMetrics();
  } else {
    window.addEventListener('load', reportMetrics, { once: true });
  }
};

export default reportPerformanceMetrics;