import asyncio
from bleak import BleakScanner, BleakClient

# UUIDs
UART_SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb"
UART_TX_CHAR_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb"

async def run():
    print("Scanning for HM-10...")
    devices = await BleakScanner.discover()
    target = None
    for d in devices:
        name = d.name or ""
        print(f"Found: {name} - {d.address}")
        if any(k in name for k in ["HM", "BT05", "AT", "MLT"]):
            target = d
            break
            
    if not target:
        print("HM-10 not found.")
        return

    print(f"Connecting to {target.name}...")
    async with BleakClient(target.address) as client:
        print(f"Connected: {client.is_connected}")
        
        def callback(sender, data):
            # Print raw hex to see EXACTLY what arrives
            hex_str = data.hex(' ').upper()
            try:
                ascii_str = data.decode('utf-8', errors='ignore')
            except:
                ascii_str = "?"
            print(f"RX ({len(data)} bytes): {hex_str}  |  Ascii: {ascii_str}")

        await client.start_notify(UART_TX_CHAR_UUID, callback)
        print("Listening for 10 seconds (Raw Data)...")
        await asyncio.sleep(10)
        await client.stop_notify(UART_TX_CHAR_UUID)

if __name__ == "__main__":
    asyncio.run(run())
