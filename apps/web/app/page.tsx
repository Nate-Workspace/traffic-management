import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

        <div className={styles.ctas}>
          <a
    <main className="min-h-screen px-8 py-12">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          Traffic Violation Management
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Frontend scaffold is ready.
        </h1>
        <p className="text-base text-slate-600">
          Start building features in the app shell and feature modules when you are
          ready.
        </p>
      </div>
    </main>
          </li>
