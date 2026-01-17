import { useEffect, useMemo, useState } from 'react'
import { Box, Flex, Text, Button, Stack, Separator, Input } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable, TableColumn } from '@/components/common/CommonTable'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useProducts } from '@/hooks/useProducts'

type Product = {
  _id: string
  name: string
  barcode: string
  sellingPrice: number
  tax: number
}

type InvoiceItem = {
  _id: string
  name: string
  barcode: string
  sellingPrice: number
  tax: number
  quantity: number
}

const Invoice = () => {
  const dispatch = useDispatch()
  const { data } = useProducts()
  const products: Product[] = data?.products ?? []

  const [items, setItems] = useState<InvoiceItem[]>([])

  useEffect(() => {
    dispatch(setHeader({ title: 'Invoice' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const addProduct = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id)
      if (existing) {
        return prev.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i))
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          barcode: product.barcode,
          sellingPrice: product.sellingPrice,
          tax: product.tax,
          quantity: 1,
        },
      ]
    })
  }

  const updateQty = (_id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i._id === _id ? { ...i, quantity: Math.max(1, qty) } : i)))
  }

  const deleteItem = (_id: string) => {
    setItems((prev) => prev.filter((i) => i._id !== _id))
  }

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.sellingPrice * i.quantity, 0),
    [items],
  )

  const totalTax = useMemo(
    () => items.reduce((acc, i) => acc + (i.sellingPrice * i.quantity * i.tax) / 100, 0),
    [items],
  )

  const grandTotal = subtotal + totalTax

  const columns: TableColumn<InvoiceItem>[] = [
    { key: 'name', header: 'Name', render: (r) => r.name },
    {
      key: 'barcode',
      header: 'Barcode',
      render: (r) => r.barcode,
    },
    {
      key: 'sellingPrice',
      header: 'Price',
      render: (r) => `₹${r.sellingPrice}`,
    },
    {
      key: 'tax',
      header: 'Tax %',
      render: (r) => `${r.tax}%`,
    },
    {
      key: 'quantity',
      header: 'Qty',
      render: (r) => (
        <Input
          type="number"
          width="80px"
          value={r.quantity}
          onChange={(e) => updateQty(r._id, Number(e.target.value))}
        />
      ),
    },
    {
      key: 'beforeTax',
      header: 'Before Tax',
      render: (r) => `₹${r.sellingPrice * r.quantity}`,
    },
    {
      key: 'afterTax',
      header: 'After Tax',
      render: (r) => `₹${Math.round(r.sellingPrice * r.quantity * (1 + r.tax / 100))}`,
    },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <Button size="xs" bg="red.500" color="white" onClick={() => deleteItem(r._id)}>
          Delete
        </Button>
      ),
    },
  ]

  const downloadPDF = async () => {
    const el = document.getElementById('invoice-print-area')
    if (!el) return

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pageWidth = 210
    const pageHeight = 297

    const imgHeight = (canvas.height * pageWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position -= pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('invoice.pdf')
  }

  return (
    <Box bg="gray.100">
      {/* PRINT AREA */}
      <Box
        id="invoice-print-area"
        maxW="1100px"
        mx="auto"
        my={6}
        bg="white"
        p={8}
        color="gray.900"
        css={{
          '@media print': {
            boxShadow: 'none',
            borderRadius: 0,
            margin: 0,
            maxW: '100%',
            width: '100%',
          },
        }}
      >
        <Flex direction="column" gap={6}>
          {/* Header */}
          <Flex justify="space-between">
            <Box>
              <Text fontSize="2xl" fontWeight="600">
                Invoice
              </Text>
              <Text fontSize="sm" color="gray.600">
                Invoice #INV-1023
              </Text>
              <Text fontSize="sm" color="gray.600">
                Date: 21 Aug 2026
              </Text>
            </Box>

            {/* ACTIONS — HIDDEN IN PRINT */}
            <Stack
              direction="row"
              gap={2}
              className="no-print"
              css={{
                '@media print': {
                  display: 'none',
                },
              }}
            >
              <Button size="sm" border="1px solid #E5E7EB" onClick={downloadPDF}>
                Download PDF
              </Button>
              <Button size="sm" bg="#2563EB" color="white" onClick={() => window.print()}>
                Print
              </Button>
            </Stack>
          </Flex>

          <Separator />

          {/* Add Product — HIDDEN IN PRINT */}
          <Box
            maxW="360px"
            css={{
              '@media print': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="sm" mb={1} color="gray.600">
              Add product
            </Text>
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" px={3} py={2}>
              <select
                style={{
                  width: '100%',
                  outline: 'none',
                  border: 'none',
                  background: 'transparent',
                }}
                onChange={(e) => {
                  const p = products.find((x) => String(x._id) === e.target.value)
                  if (p) addProduct(p)
                }}
              >
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} – ₹{p.sellingPrice}
                  </option>
                ))}
              </select>
            </Box>
          </Box>

          {/* Table */}
          <Box border="1px solid" borderColor="gray.200" borderRadius="md">
            <Box
              maxH="300px"
              overflowY="auto"
              css={{
                '@media print': {
                  maxHeight: 'none',
                  overflow: 'visible',
                },
              }}
            >
              <CommonTable columns={columns} data={items} rowKey={(r) => r._id} />
            </Box>
          </Box>

          {/* Totals */}
          <Flex justify="flex-end" mt={6}>
            <Box w="360px">
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Subtotal (Before Tax)</Text>
                <Text>₹{subtotal}</Text>
              </Flex>

              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Total Tax</Text>
                <Text>₹{totalTax}</Text>
              </Flex>

              <Separator my={3} />

              <Flex justify="space-between" fontSize="lg" fontWeight="600">
                <Text>Grand Total</Text>
                <Text>₹{grandTotal}</Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Invoice
