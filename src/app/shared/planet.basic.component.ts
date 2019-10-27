export abstract class PlanetBasicComponent {
  protected loading: boolean;
  protected loadingMessage: string;

  protected constructor(...args: any) {}

  public showLoading(message: string = 'Loading...') {
    this.loadingMessage = message;
    this.loading = true;
  }

  public hideLoading() {
    this.loading = false;
    this.loadingMessage = '';
  }
}
