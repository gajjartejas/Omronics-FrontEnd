import { SystemState } from "../system/SystemState";

export const selectAccount = (state: SystemState) => state.account.account;
export const selectAccountId = (state: SystemState) => state.account.account.accountGuid;
