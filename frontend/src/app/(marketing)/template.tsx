import { ViewTransition } from "react";

/**
 * Wraps each marketing page so route navigations use the browser View Transitions API
 * (cross-fade by default). Layout (navbar/footer) stays outside this boundary.
 */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewTransition>{children}</ViewTransition>;
}
