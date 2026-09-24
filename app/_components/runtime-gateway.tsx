import { TextCta } from "./text-cta";

type RuntimeGatewayProps = {
  runtimeHref: string;
  note?: string;
};

/**
 * The experience boundary: the visitor should understand when they are leaving
 * the catalogue and entering the experiment's own runtime.
 */
export function RuntimeGateway({ runtimeHref, note }: RuntimeGatewayProps) {
  return (
    <div className="stack stack--3">
      <p className="boundary">
        {note ??
          "Opening this leaves the catalogue. The experiment runs as its own application, with its own typography and interaction model."}
      </p>
      <div>
        <TextCta href={runtimeHref} hard>
          Open the experiment
        </TextCta>
      </div>
    </div>
  );
}
