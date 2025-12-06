FROM jekyll/jekyll:4.2.2

WORKDIR /srv/jekyll

# Copy the docs directory
COPY docs/ ./

# Install dependencies
RUN bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
