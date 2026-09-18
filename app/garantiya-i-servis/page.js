import Image from "next/image";

export default function WarrantyService() {
  return (
    <main className="min-h-screen bg-white text-[#111111] px-6 md:px-16 lg:px-24 py-12 font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* Заголовок */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Гарантия и сервис
        </h1>

        {/* Верхняя секция: плашка слева, текст справа */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          <div className="lg:col-span-4 bg-[#F4F4F4]   p-6 rounded-none">
            <h3 className="text-emerald-600 font-semibold mb-2">Внимание!</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Гарантийный срок отсчитывается с даты отгрузки товара со склада.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <p className="text-neutral-800 leading-relaxed text-base md:text-lg">
              На всю представленную на нашем сайте продукцию распространяется
              гарантия от 2 до 7 лет. Более точную информацию вы найдете на
              странице соответствующего продукта.
            </p>
            <h2 className="font-semibold text-neutral-900 pt-2">
              Гарантийные обязательства распространяются:
            </h2>
            <ul className="space-y-2 text-neutral-800">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                на светильники;
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                корпуса светильников;
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                оптические элементы и другие электротехнические компоненты;
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                элементы крепления, установки и подсоединения светильников к
                электрической сети.
              </li>
            </ul>
          </div>
        </div>

        {/* Главный баннер (картинка) */}
        <div className="w-full h-[350px] md:h-[480px] relative mb-16 overflow-hidden">
          <Image
            src="/stena.png"
            alt="Гарантия и сервис"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Нижняя часть: две колонки (блок слева, контент справа) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Левая колонка с плашкой */}
          <div className="lg:col-span-4 bg-[#F4F4F4] p-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Выполнение гарантийных обязательств происходит в рамках{" "}
              <span className="text-emerald-700 font-medium">
                законодательства РФ
              </span>{" "}
              и в соответствии с договорами между партнерами и HTL.
            </p>
          </div>

          {/* Правая колонка с текстом и правилами */}
          <div className="lg:col-span-8 space-y-10 text-neutral-800 text-sm md:text-base">
            {/* Условия гарантии */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Условия гарантии
              </h2>
              <p className="leading-relaxed text-neutral-700">
                Гарантия действует только в случаях, когда продукция
                транспортировалась, хранилась, монтировалась и эксплуатировалась
                с соблюдением требований производителя, изложенных в паспорте
                изделия, ТУ, инструкциях по монтажу и эксплуатации, а также
                прописанных в условиях поставки, правилах технической
                эксплуатации электроустановок для потребителей и других
                обязательных для сторон правилах, которые дополнительно были
                установлены в рамках договоров.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Претензии по изменению оттенков окрашенных поверхностей и
                пластиковых частей светильников в процессе их эксплуатации не
                принимаются, так как такие случаи не признаются гарантийными.
              </p>
            </div>

            {/* Исполнение гарантийных обязательств */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Исполнение гарантийных обязательств
              </h2>
              <p className="leading-relaxed text-neutral-700">
                При поступлении обоснованной рекламации мы принимаем неисправную
                продукцию, чтобы провести техническую экспертизу и принять
                решение на основании дефектовки в нашем сервисном центре.
              </p>
              <p className="leading-relaxed text-neutral-700">
                В период действия гарантии при поломке или дефекте мы оперативно
                осуществляем ремонт или замену оборудования в рамках гарантийных
                обязательств, а также принимаем на себя расходы по доставке
                отремонтированной / замененной / подмененной продукции.
              </p>
              <p className="leading-relaxed text-neutral-700">
                После окончания срока гарантийных обязательств мы оставляем за
                собой право рассмотреть рекламацию, чтобы принять решение о
                замене или компенсации стоимости оборудования, которое было
                признано не соответствующим техническим параметрам.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Внимание! После приобретения изделия, пожалуйста, сохраняйте
                документ, подтверждающий факт и дату покупки. Он может
                потребоваться в случае обращения за гарантийным обслуживанием.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Вы можете оформить обращение по гарантии, заполнив рекламацию и
                отправив ее нам на{" "}
                <a
                  href="mailto:service@h-t-l.ru"
                  className="text-emerald-700 hover:underline"
                >
                  service@h-t-l.ru
                </a>
              </p>
            </div>

            {/* Предъявление рекламаций на неисправное оборудование */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Предъявление рекламаций на неисправное оборудование
              </h2>
              <p className="leading-relaxed text-neutral-700">
                Предъявление рекламаций (претензий) на продукцию по гарантии
                осуществляется в гарантийный срок, который указан в паспорте
                готового изделия.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Рекламацию необходимо предъявлять по форме, установленной в
                договоре. Если поставка была осуществлена по договору-счету, то
                необходимо подготовить и направить на адрес{" "}
                <a
                  href="mailto:info@h-t-l.ru"
                  className="text-emerald-700 hover:underline"
                >
                  info@h-t-l.ru
                </a>{" "}
                акт рекламации{" "}
                <a
                  href="/docs/akt-reklamacii.doc"
                  className="text-emerald-700 hover:underline"
                >
                  (скачать)
                </a>
              </p>
            </div>

            {/* Рассмотрение рекламаций и выполнение обязательств */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Рассмотрение рекламаций и выполнение обязательств
              </h2>
              <p className="leading-relaxed text-neutral-700">
                Каждую рекламацию мы рассматриваем в течение 60 часов с момента
                ее получения.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Сроки замены бракованного товара указываются в ответе
                (заключении) на рекламацию с учетом его наличия на нашем складе
                или сроков изготовления.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Вся дополнительная информация имеется в паспорте на
                оборудование.
              </p>
              <p className="leading-relaxed text-neutral-700">
                При возникновении вопросов по гарантийной поддержке обращайтесь
                к нам или к компании-дилеру, с которой сотрудничаете.
              </p>
              <p className="leading-relaxed text-neutral-700">
                Сервисный центр HTL:{" "}
                <a
                  href="mailto:service@h-t-l.ru"
                  className="text-emerald-700 hover:underline"
                >
                  service@h-t-l.ru
                </a>
              </p>
            </div>

            {/* Правовое поле */}
            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900">
                Правовое поле
              </h2>
              <p className="leading-relaxed text-neutral-700">
                Получите больше информации по телефону:{" "}
                <a
                  href="tel:+74951251007"
                  className="hover:text-emerald-700 transition-colors"
                >
                  +7 (495) 125-10-07
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
