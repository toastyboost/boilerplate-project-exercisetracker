export const toTs = (date: any) => {
  return +(new Date(new Date(String(date)).toISOString()))
}

