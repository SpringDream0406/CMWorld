export class Components {
  static openStie = (selectedSite: HTMLSelectElement | string): void => {
    window.open(`https://${selectedSite}`, "_blank");
  };
}
