import type { BuilderConfig } from '@modern-js/builder-rspack-provider';
import type { PluggableList } from 'unified';
import { UserConfig, PageIndexInfo, RouteMeta } from '.';

/**
 * There are two ways to define what addtion routes represent.
 * 1. Define filepath, then the content will be read from the file.
 * 2. Define content, then then content will be written to temp file and read from it.
 */
export interface AdditionalPage {
  routePath: string;
  content?: string;
  filepath?: string;
}

export interface RspressPlugin {
  /**
   * Name of the plugin.
   */
  name: string;
  /**
   * Global style
   */
  globalStyles?: string;
  /**
   * Markdown options.
   */
  markdown?: {
    remarkPlugins?: PluggableList;
    rehypePlugins?: PluggableList;
    globalComponents?: string[];
  };
  /**
   * Builder config.
   */
  builderConfig?: BuilderConfig;
  /**
   * Inject global components.
   */
  globalUIComponents?: string[];
  /**
   * Modify doc config.
   */
  config?: (config: UserConfig) => UserConfig | Promise<UserConfig>;
  /**
   * Callback before build
   */
  beforeBuild?: (config: UserConfig, isProd: boolean) => Promise<void>;
  /**
   * Callback after build
   */
  afterBuild?: (config: UserConfig, isProd: boolean) => Promise<void>;
  /**
   * Extend every page's data
   */
  extendPageData?: (
    pageData: PageIndexInfo & {
      [key: string]: unknown;
    },
  ) => void | Promise<void>;
  /**
   * Add custom route
   */
  addPages?: (
    config: UserConfig,
    isProd: boolean,
  ) => AdditionalPage[] | Promise<AdditionalPage[]>;
  /**
   * Callback after route generated
   */
  routeGenerated?: (routes: RouteMeta[]) => Promise<void> | void;
  /**
   * Add addition ssg routes, for dynamic routes.
   */
  addSSGRoutes?: (
    config: UserConfig,
    isProd: boolean,
  ) => { path: string }[] | Promise<{ path: string }[]>;
  /**
   * @private
   * Modify search index data.
   */
  modifySearchIndexData?: (data: PageIndexInfo[]) => void | Promise<void>;
}
