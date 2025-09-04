import { PageWrapper } from "~/components/PageWrapper";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <section className="max-w-2xl w-full mx-auto grid grid-cols-[192px_1fr] gap-4">
        <img
          src="/sara.jpg"
          className="bg-green-200 rounded-full size-48 object-center object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">Sara Kristiansdottir Thon</h1>
          <p className="text-lg text-gray-600">@sarakt</p>
          <p className="mt-4">
            Hei! Jeg er en strikkeentusiast som elsker å lage vakre og
            funksjonelle plagg.
          </p>
          <p className="mt-4">
            Dette er bare et hobbyprosjekt av en strikkeapp jeg selv kunne tenke
            meg å lage en gang.
          </p>
          <p className="mt-4">
            Litt uferdig, men veldig gøy å holde på med så langt!
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
