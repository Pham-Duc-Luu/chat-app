import en from "./messages/en.json";
import vi from "./messages/vi.json";
type English = typeof en;
type VietNamese = typeof vi;
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends English {}
  //   interface IntlMessages extends VietNamese {}
}
