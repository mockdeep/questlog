function makeUserState(attrs: Partial<UserState> = {}): UserState {
  return {
    notificationsEnabled: false,
    ...attrs,
  };
}

export {makeUserState};
