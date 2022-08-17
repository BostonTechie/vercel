//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s

import { requireUserId } from "~/utils/auth.server";
import { LoaderFunction, json } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { Sidebar } from '~/components/sidebar'
import { prisma } from '../utils/prisma.server'
import { useLoaderData } from "@remix-run/react";


//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const res = await prisma.hive.findMany({
        where: {},
    })
    return json(res)
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Hive() {

    const cryptoData = useLoaderData()
    return (
        <Layout>
            <Sidebar />

            <div className="mt-8 flex flex-col float-right w-9/12">
                <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <main className="flex-1">
                            <div className="py-6">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    <h1 className="text-2xl font-semibold text-gray-900">Hive Data</h1>
                                </div>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <div className="sm:flex sm:items-center">
                                            <div className="sm:flex-auto">

                                                <p className="mt-2 text-sm text-gray-700">
                                                    A list of all Hive data.
                                                </p>
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                                >
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex flex-col">
                                            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 align-middle">
                                                    <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                                        <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                                                            <thead className="bg-gray-5000">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                                    >
                                                                        dbid#
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                                                    >
                                                                        Asset
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                                                    >
                                                                        From
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        To
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Quant
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Price
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Gross
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Net
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Trans
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Debit
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-500 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Credit
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                                {cryptoData.map((data, dataIdx) => (
                                                                    <tr key={data.dbid}>


                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.dbid}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Asset}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.From}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.To}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Quantity}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Token_Price}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Gross_Proceed}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Net}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {data.Transaction_Type}
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            debit
                                                                        </td>

                                                                        <td
                                                                            className={classNames(
                                                                                dataIdx !== cryptoData.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            credit
                                                                        </td>

                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
