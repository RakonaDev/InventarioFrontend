import Link from "next/link";
import { Header } from "../../components/estructura/Header";
import { FaUsers } from "react-icons/fa6";
import { AdminProvider } from "../../context/AdminContext";
import { ModalRender } from "./dashboard/@components/ModalRender";
import { GiFruitBowl } from "react-icons/gi";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <Header />
      <section className="w-full flex justify-between h-[calc(100dvh-80px)] ">
        <div className="w-[280px] bg-secundario-main h-auto">
          <ul>
            <li>
              <Link
                href={"/dashboard/usuarios"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-secundario-500 text-white-main"
              >
                <span className="text-2xl">
                  <FaUsers />
                </span>
                <p className="text-lg">Usuarios</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/insumos"}
                className="w-full flex items-center gap-3 px-12 py-4 hover:bg-secundario-500 text-white-main"
              >
                <span className="text-2xl">
                  <GiFruitBowl />
                </span>
                <p className="text-lg">Insumos</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex-1 p-8 overflow-y-auto bg-gray-100">
          {children}
        </div>
      </section>
      <ModalRender />

    </AdminProvider>
  );
}
