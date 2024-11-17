export const toRequest = (payload: any) => {
  const { skill, level } = payload;

  return { skill, level };
};

export const toResponse = (payload: any) => {
  const { id, skill, level } = payload;

  return { id, skill, level };
};
