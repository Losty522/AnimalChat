import React from "react";

type Props = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};

const IconSlect = (props: Props) => {
  const iconImages = [
    "https://1.bp.blogspot.com/--c0K8UbKthw/USSkrgcx9EI/AAAAAAAANWI/wSq7qttn9Lg/s400/hiyoko.png",
    "https://1.bp.blogspot.com/-7iXiVjHj8MI/XTVpR2RlxiI/AAAAAAABT2k/9fNWh-dYk3cocH3pP_fUK8nIzmaEo832gCLcBGAs/s400/bird_niwatori_chabo.png",
    "https://1.bp.blogspot.com/-Fn-oz-1cGTI/X4aVjdBGL0I/AAAAAAABbwY/bG-apG9Dk9AtYWlGuiqSc9N8A-l5Z7XAwCNcBGAsYHQ/s400/hamster_sleeping_golden.png",
    "https://1.bp.blogspot.com/-ZOJcLNHUdnc/X4aVbwBlb0I/AAAAAAABbuU/sMuY6n5lyaE7elv5sF67gbw0zo3uJi7NQCNcBGAsYHQ/s400/animal_uma_horse_stand.png",
    "https://1.bp.blogspot.com/-c-OqcO_Duvo/XxU0Tix8y8I/AAAAAAABaJA/WBNfRQv9hfgAqOpnqBbvyFXUVp0i04LJQCNcBGAsYHQ/s400/animal_wallaby_kangaroo.png",
    "https://1.bp.blogspot.com/-V9jkXW52Txk/XdttQl-CwWI/AAAAAAABWGE/r0iBajapXLc6_VAObmmjB5YWI3YJhCJ8QCNcBGAsYHQ/s400/animal_yagi_nikudare.png",
    "https://2.bp.blogspot.com/-ruMSXp-w-qk/XDXbUFVC3FI/AAAAAAABQ-8/QRyKKr--u9E1-Rvy2SQqt0QPWeq1ME6wgCLcBGAs/s400/animal_gorilla.png",
    "https://4.bp.blogspot.com/-3RUKo5svYpQ/W4PJhjUdq_I/AAAAAAABOH4/gKeyTomHJNs7OF1YkvbuvQo-jUqen9SrwCLcBGAs/s400/animal_usaghi_netherland_dwarf.png",
    "https://1.bp.blogspot.com/-xo-R4eEk7is/Wp93c6qMEEI/AAAAAAABKls/lQWBMs-nxts4qzdzx_3HLuVNS7z4T0rYwCLcBGAs/s400/animal_hyou_panther.png",
    "https://4.bp.blogspot.com/--ysNcYpsGXU/V9vB__9_KwI/AAAAAAAA96s/VWdgwqiOfzcahqy5VK_FisOqFHwo2os4gCLcB/s400/animal_bear_character.png",
    "https://1.bp.blogspot.com/-2dfqdj4nnTY/VxC3WEivQEI/AAAAAAAA54I/4aGk4Ou1-fQ2GLqbby1yGwJwNEl7akB3QCLcB/s450/animal_kirin.png",
    "https://4.bp.blogspot.com/-7ONbdin9xfo/VJ6XSbSf6KI/AAAAAAAAqIc/NxaH4RaCDbo/s400/animal_lion.png",
  ];

  return (
    <div className="w-10/12 flex flex-wrap mx-auto">
      {iconImages.map((url, index) => (
        <div key={index} className=" w-4/12 flex justify-center">
          <img
            className={`w-16 h-16 sm:w-24 sm:h-24 my-1 p-1 object-contain rounded-full shadow-lg hover:bg-blue-100  ${
              props.icon === url
                ? "border-4 border-blue-500 bg-blue-100 animate-pulse"
                : "border border-gray-300 bg-white "
            }`}
            src={url}
            alt=""
            onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
              props.setIcon(e.currentTarget.src);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default IconSlect;
