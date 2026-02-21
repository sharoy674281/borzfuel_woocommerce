export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} BorzFuel Nutrition. All rights
        reserved.
      </div>
    </footer>
  );
}
