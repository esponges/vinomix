import Component, {
  ErrorBoundary,
  CatchBoundary,
  meta,
} from '~/route-containers/layout/layout.component';
import { loader, unstable_shouldReload } from '~/store/initialData.server';

export default Component;
export { ErrorBoundary, CatchBoundary, meta, loader, unstable_shouldReload };
