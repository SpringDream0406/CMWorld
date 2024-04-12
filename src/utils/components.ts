export class Components {
  static openStie = (selectedSite: HTMLSelectElement | string): void => {
    window.open(`${selectedSite}`, "_blank");
  };
}
