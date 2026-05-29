export default function LocationMap({
    lat,
    lng,
    name,
  }: {
    lat: number;
    lng: number;
    name: string;
  }) {
    const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <iframe
          title={`${name} konumu`}
          src={src}
          width="100%"
          height="280"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      </div>
    );
  }