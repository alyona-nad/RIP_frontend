export interface IColorant {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
    Properties:string 
    Status:string
}

export const colorants: IColorant[] = [
    {
        "ID_Colorant": 6,
        "Name": "Оксид(III) хрома",
        "Image": "http://127.0.0.1:9000/rip1/Cr2O3.jpg",
        "Link": "/product/6",
        "Description": "Оксид хрома — неорганическое соединение, используемое в керамике в качестве зеленого красителя. Химическая формула оксида хрома — Cr2O3, а оксид хрома доступен в виде порошка.",
        "Properties": "Температура плавления 2435 °C, кипения ок. 4000 °C. Плотность 5,21 г/см³ (из иностранных источников 5,23 г/см³). Нерастворим в воде.",
        "Status": "Действует"
    },
    {
        "ID_Colorant": 2,
        "Name": "Гуммиарабик",
        "Image": "http://localhost:9000/ripnew/colorants/2/image",
        "Link": "/product/2",
        "Description": "Твёрдая прозрачная смола, состоящая из высохшего сока различных видов акаций.",
        "Properties": "Вязкая жидкость, затвердевающая на воздухе. Гуммиарабик хорошо растворяется в тёплой воде (в холодной намного хуже) с образованием клейкого слабокислого раствора.",
        "Status": "Действует"
    },
    {
        "ID_Colorant": 3,
        "Name": "Диоксид титана",
        "Image": "http://127.0.0.1:9000/rip1/TiO2.jpg",
        "Link": "/product/3",
        "Description": "Чистый диоксид титана — бесцветные кристаллы (желтеет при нагревании). Для технических целей применяется в раздробленном состоянии, представляя собой белый порошок. Не растворяется в воде и разбавленных минеральных кислотах (за исключением плавиковой).",
        "Properties": "Плотность: 4,235 г/см3\\n/nТемпература плавления: 1843°C Температура кипения: 2972°C<br> Растворимость в воде: не растворяется<br>Температура разложения: 2900°C",
        "Status": "Действует"
    },
    {
        "ID_Colorant": 4,
        "Name": "Оксид(III) железа",
        "Image": "http://localhost:9000/ripnew/colorants/4/image",
        "Link": "/product/4",
        "Description": "Амфотерный оксид с большим преобладанием основных свойств. Красно-коричневого цвета. Термически устойчив до высоких температур. Образуется при сгорании железа на воздухе. Не реагирует с водой. Медленно реагирует с кислотами и щелочами.",
        "Properties": "Плотность:\t5,242 г/см3 Температура плавления:\t1566°C Растворимость в воде:\tнерастворим",
        "Status": "Действует"
    },
    {
        "ID_Colorant": 5,
        "Name": "Оксид(IV) марганца",
        "Image": "http://localhost:9000/ripnew/colorants/5/image",
        "Link": "/product/5",
        "Description": "Неорганическое твердое соединение марганца и кислорода, состоящее из черных/серо-стальных тетрагональных мелких кристаллов. Цвет данного вещества – бурый/темно-коричневый.",
        "Properties": "Плотность 5,026 г/см³. Термические свойства вещества характеризуются температурой разложения 535 °C. В воде не растворяется. Из всех соединений марганца самое устойчивое.",
        "Status": "Действует"
    },
];
