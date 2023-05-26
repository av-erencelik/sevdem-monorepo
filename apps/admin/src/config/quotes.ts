export const quotes: Quote[] = [
  {
    text: "Tercihleriniz umutlarınızı yansıtsın, korkularınızı değil.",
    sayer: "Nelson Mandela",
    vikiUrl: "https://tr.wikipedia.org/wiki/Nelson_Mandela",
  },
  {
    text: "Bundan yirmi yıl sonra yapmadığınız şeylerden dolayı, yaptıklarınızdan daha fazla pişman olacaksınız. Öyleyse demir alın, güvenli limanlardan çıkın, rüzgarları arkanıza alın. Araştırın, hayal edin ve keşfedin.",
    sayer: "Mark Twain",
    vikiUrl: "https://tr.wikipedia.org/wiki/Mark_Twain",
  },
  {
    text: "Bir şeye başlayıp başarısız olmaktan daha kötü tek şey hiçbir şeye başlamamaktır.",
    sayer: "Seth Godin",
    vikiUrl: "https://tr.wikipedia.org/wiki/Seth_Godin",
  },
  {
    text: "Bir gün kalkacaksınız ve hep hayal ettiğiniz şeyleri yapmaya vakit kalmamış olacak. Şimdi harekete geçmenin tam zamanı.",
    sayer: "Paulo Coelho",
    vikiUrl: "https://tr.wikipedia.org/wiki/Paulo_Coelho",
  },
  {
    text: "Dünya yüzünde gördüğümüz her şey kadının eseridir.",
    sayer: "Mustafa Kemal Atatürk",
    vikiUrl: "https://tr.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk",
  },
  {
    text: "Bütün merdivenleri görmek zorunda değilsiniz. Yapmanız gereken tek şey ilk adımı atmak.",
    sayer: "Martin Luther King Jr.",
    vikiUrl: "https://tr.wikipedia.org/wiki/Martin_Luther_King",
  },
  {
    text: "Eğer yürüdüğünüz yolda güçlük ve engel yoksa, bilin ki o yol sizi bir yere ulaştırmaz.",
    sayer: "Bernard Shaw",
    vikiUrl: "https://tr.wikipedia.org/wiki/Bernard_Shaw",
  },
];

type Quote = {
  text: string;
  sayer: string;
  vikiUrl: string;
};
