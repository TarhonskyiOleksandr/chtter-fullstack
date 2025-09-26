// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge = (existing: any, incoming: any, { args }: any) => {
  const merged = existing ? [...existing] : [];

  for (let i = 0; i < incoming?.length; i++) {
    merged[args.offset + i] = incoming[i];
  }

  return merged;
};
