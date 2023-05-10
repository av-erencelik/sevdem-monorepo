export const metadata = {
  title: "Sevdem Maya - Admin",
  description:
    "Sevdem Maya, doğal ve lezzetli ekşi maya ekmeklerinin adresi. Tamamen doğal malzemelerle ürettiğimiz ekmeklerimiz, sağlıklı ve besleyici bir alternatif sunar. Siz de eşsiz tadımızı keşfedin ve sağlıklı bir beslenme için Sevdem Maya'yı tercih edin.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
