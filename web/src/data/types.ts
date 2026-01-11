export interface Plugin {
  name: string;
  displayName: string;
  description: string;
  categories: string[];
  authors: Array<{
    name: string;
    url: string;
  }>;
  license: string;
  links: {
    repository: string;
    homepage?: string;
    documentation?: string;
  };
  opencode: {
    minimumVersion: string;
    maximumVersion?: string;
  };
  installation: {
    summary: string;
    markdown: string;
  };
  usage?: {
    markdown: string;
  };
  maintained: boolean;
  lastUpdated: string;
  installableFromMarketplace?: boolean;
}
