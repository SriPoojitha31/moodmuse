export async function getAIInsight(entry) {
  // Simulate network delay and AI response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ insight: `AI thinks you are feeling reflective about: "${entry}"` });
    }, 1200);
  });
}
