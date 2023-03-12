export interface Account {
  accountGuid: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AccountState {
  account: Account;
  error: string | null;
  isLoading: boolean;
}
